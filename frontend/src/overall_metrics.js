import { reference_points } from "./Data"

function is_number_and_not_nan(value) {
    return (typeof (value) == "number") && (!isNaN(value))
}

function score_normalizer(columns, data) {
    let submissions = []
    for (let i = 0; i < data.length; i++) {
        let submission = {}
        for (let j = 0; j < columns.length; j++) {
            let accessor = columns[j].accessor
            let value = data[i][accessor]

            if (
                accessor.includes("ERfold") ||
                accessor.includes("ASR_LM")
            ) {
                continue
            }

            if (
                accessor.includes("_eer_") ||
                accessor.includes("_per_") ||
                accessor.includes("_wer_") ||
                accessor.includes("_der_") ||
                accessor.includes("_cer_")
            ) {
                submission[accessor] = 100 - value
            }
            else {
                submission[accessor] = value
            }
        }
        submissions.push(submission)
    }
    return submissions
}

function parameter_panelize(score, baseline, parameter) {
    if (score <= baseline) {
        return score
    }
    else {
        return (score - baseline) / Math.max(parameter + 1e-12, 1.0)
    }
}

function parameter_panelize_all(scores, parameters, baseline_index) {
    let new_scores = scores.map(score => ({}))
    for (let i = 0; i < scores.length; i++) {
        let submission = scores[i]
        let parameter = parameters[i]
        for (let accessor in submission) {
            new_scores[i][accessor] = parameter_panelize(scores[i][accessor], scores[baseline_index][accessor], parameter)
        }
    }
    return new_scores
}

function ranking(scores) {
    let accessors = Object.keys(scores[0])
    let new_scores = scores.map(score => ({}))
    for (let j = 0; j < accessors.length; j++) {
        let metric = accessors[j]
        let metric_scores = scores.map(entry => entry[metric])
        metric_scores = metric_scores.filter(score => is_number_and_not_nan(score))
        metric_scores.sort((a, b) => (a - b))
        for (let i = 0; i < scores.length; i++) {
            let target = scores[i]
            let value = target[metric]
            if (!is_number_and_not_nan(value)) {
                new_scores[i][metric] = 0
            }
            else {
                new_scores[i][metric] = metric_scores.indexOf(value)
            }
        }
    }
    return new_scores
}

function interpolation(scores) {
    let accessors = Object.keys(scores[0])
    let new_scores = scores.map(score => ({}))
    for (let j = 0; j < accessors.length; j++) {
        let metric = accessors[j]
        let topline, baseline
        [baseline, topline] = reference_points[metric]

        for (let i = 0; i < scores.length; i++) {
            let target = scores[i]
            let value = target[metric]
            if (!is_number_and_not_nan(value)) {
                new_scores[i][metric] = -1000000 * 1000
            }
            else {
                new_scores[i][metric] = 1000 / (topline - baseline + 1e-12) * (value - baseline)
            }
        }
    }
    return new_scores
}

function task_aggregate(scores) {
    let accessors = Object.keys(scores[0])
    let tasks = new Set(accessors.map(accessor => accessor.split("_")[0]))
    let submissions = scores.map(score => ({}))
    for (let task of tasks.values()) {
        let task_metrics = accessors.filter(accessor => accessor.split("_")[0] == task)
        for (let i = 0; i < scores.length; i++) {
            let submission = scores[i]
            let task_scores = task_metrics.map(metric => submission[metric])
            let task_score_sum = task_scores.reduce((a, b) => a + b, 0) / task_metrics.length
            submissions[i][task] = task_score_sum
        }
    }
    let final_score = submissions.map(submission => Object.values(submission).reduce((a, b) => a + b, 0) / Array.from(tasks).length)
    return final_score
}

function overall_metric_adder(metrics, columns, data, subset, memoizedNumericSort) {
    let metadata_columns = columns.filter((column) => !column.isScore)
    let score_columns = columns.filter((column) => column.isScore)
    if (subset === "Paper") {
        score_columns = score_columns.filter((column) => [
            "PR public", "SID public", "KS public", "QbE public", "IC public", "ASR public", "SV public",
            "ER public", "SD public", "SF-CER public", "SF-F1 public",
        ].includes(column.Header))
    }
    else if (subset === "Public Set") {
        score_columns = score_columns.filter((column) => [
            "PR public", "SID public", "QbE public", "ASR public", "SV public",
            "ER public", "SD public", "ST public", "SE-PESQ public", "SE-STOI public",
        ].includes(column.Header))
    }
    else if (subset === "Hidden Practice Set") {
        score_columns = score_columns.filter((column) => [
            "PR practice", "SID practice", "QbE practice", "ASR practice", "SV practice",
            "ER practice", "SD practice",
        ].includes(column.Header))
    }

    let new_data;
    if (data.length > 0) {
        let scores = score_normalizer(score_columns, data)
        let fbank = scores.filter((score, index) => (data[index].submitName == "FBANK"))[0]
        if (fbank == undefined) {
            alert("No FBANK (baseline) result found. Cannot calculate metrics.")
        }
        let fbankIndex = scores.indexOf(fbank)
        let parameters = data.map(submission => parseFloat(submission.paramShared) / 1000000)
        let task_inters = interpolation(scores)
        let task_inters_p = parameter_panelize_all(task_inters, parameters, fbankIndex)

        if (metrics.includes("interpolation_p")) {
            let inters_p = task_aggregate(task_inters_p)
            for (let i = 0; i < data.length; i++) {
                data[i]["score_p"] = parseFloat(inters_p[i].toFixed(2))
            }
            score_columns.unshift({
                Header: "Score-P",
                accessor: "score_p",
                width: 90,
                sortType: memoizedNumericSort,
                higherBetter: true,
                isScore: true,
            })
        }

        if (metrics.includes("rank_p")) {
            let task_ranks_p = ranking(task_inters_p)
            let ranks_p = task_aggregate(task_ranks_p)
            for (let i = 0; i < data.length; i++) {
                data[i]["rank_p"] = ranks_p[i]
            }
            score_columns.unshift({
                Header: "Rank-P",
                accessor: "rank_p",
                width: 90,
                sortType: memoizedNumericSort,
                higherBetter: true,
                isScore: true,
            })
        }

        if (metrics.includes("interpolation")) {
            let inters = task_aggregate(task_inters)
            for (let i = 0; i < data.length; i++) {
                data[i]["score"] = Math.round(inters[i])
            }
            score_columns.unshift({
                Header: "Score",
                accessor: "score",
                width: 80,
                sortType: memoizedNumericSort,
                higherBetter: true,
                isScore: true,
            })
        }

        if (metrics.includes("rank")) {
            let task_ranks = ranking(task_inters)
            let ranks = task_aggregate(task_ranks)
            for (let i = 0; i < data.length; i++) {
                data[i]["rank"] = ranks[i]
            }
            score_columns.unshift({
                Header: "Rank",
                accessor: "rank",
                width: 80,
                sortType: memoizedNumericSort,
                higherBetter: true,
                isScore: true,
            })
        }

        new_data = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].submitName == "FBANK") {
                continue
            }
            let cloned_dict = { ...data[i] }

            // DEBUGGING
            // for (let accessor in task_inters[0]) {
            //     cloned_dict[accessor] = Math.round(task_inters[i][accessor])
            // }

            new_data.push(cloned_dict)
        }
    }

    if (new_data != undefined) {
        data = new_data
    }

    metadata_columns.push(...score_columns)
    return [metadata_columns, data]
}

export { overall_metric_adder }