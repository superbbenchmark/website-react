# Speech processing Universal PERformance Benchmark (SUPERB)
![image](./imgs/logo.png)
Here are the frontend and backend servers.

## Deployment
https://superbbenchmark.org/


## Setup Guide
### Initial step
Please install `nginx` and configure its setting. A sample file `nginx_setting` is provided.
```bash
sudo apt install nginx
sudo systemctl start nginx
```
**A domain name and corresponding certificate is required** for this server. To automatically issue, renew and install the certificate, tools of [Certbot](https://certbot.eff.org/) and [ACME](https://github.com/acmesh-official/acme.sh) are recommended.
### Set up database
Please install `MySQL` and create an account for `superb` database.
1. Install
```script
sudo apt install mysql-server
sudo mysql_secure_installation
sudo mysql
```
2. Create an account
```sql
CREATE USER '<username>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>';
GRANT ALL PRIVILEGES ON *.* TO '<username>'@'localhost' WITH GRANT OPTION;
```
3. Create a `superb` database
```sql
CREATE database superb;
```
### Set up fronend server
Please refer to `./frontend/`
### Set up backend server
Please refer to `./backend/`

## To add new metric/task
### MySQL
```sql
ALTER TABLE superb.scores
ADD ${column_name} float;
```
- Please mind that `${column_name}` = `${task}_${metric}_${mode}`.
e.g. `PR_per_public` and `QbE_mtwv_hidden`.
### Backend
1. Put your ground truth in `./backend/inference/truth/${task}` folder.
2. Modify `./backend/calculate.py` with the following template:
```python
#============================================#
#                   ${task}                  #
#============================================#
# ${task} {public/hidden}
if os.path.isdir(os.path.join(predict_root, "${task_folder}")):
    if os.path.isfile(os.path.join(predict_root, "${task_folder}", "${gt_file}")):
        if #what user uploaded is valid:
            print("[${task} ${public/hidden}]", file=output_log_f)
            try:
                score = # calcuation
                print(f"${task}: ${metric} {score}", file=output_log_f)
                score_model.${task}_${metric}_${mode} = score
                session.commit()
            except Exception as e:
                print(e, file=output_log_f)
```
3. Modify `./backend/models/score.py`. Add a column like:
```python
${task}_${metric}_${mode} = db.Column(db.Float)
```
4. Modify `./backend/models/naive_models.py`. Add a column to `ScoreModel` class like:
```python
${task}_${metric}_${mode} = db.Column(db.Float)
```
5. Modify `./backend/configs.yaml`. Add your new task info to the `SCORE` section of `INDIVIDUAL_SUBMISSION_INFO` and `LEADERBOARD_INFO`.

6. (Optional) Add calcuated scores of your new task/metric for official models by modifying the `get_leaderboard_default()` function defined in `./backend/utils.py`.

### Frontend
1. Append the `individual_submission_columnInfo` array in `./frontend/src/Data.js` with:
```js
${task}_${metric}_${mode}: {
    header: "${task} ${mode}",
    width: 100,
    higherBetter: false,
    isScore: true,
    type: "number",
},
```
2. Append the `leaderboard_columnInfo` array in `./frontend/src/Data.js` with:
```js
${task}_${metric}_${mode}: {
    header: "${task} ${mode}",
    width: 100,
    higherBetter: false,
    isScore: true,
    type: "number",
},
```

## To add new fields

### MySQL

```sql
ALTER TABLE superb.files
ADD ${column_name} bigint unsigned default NULL; -- if required: remove "default NULL"
```

### Backend

1. Modify `./backend/models/file.py`. Add a column like:

    ```python
    from sqlalchemy.dialects.mysql import BIGINT
    ${column_name} = db.Column(BIGINT)
    ```

2. Modify `./backend/models/naive_models.py`. Add a column to `FileModel` class like:

    ```python
    from sqlalchemy.dialects.mysql import BIGINT
    ${column_name} = db.Column(BIGINT)
    ```

3. Modify `./backend/configs.yaml`. Add your new task info to the `FILE` section of `INDIVIDUAL_SUBMISSION_INFO` and `LEADERBOARD_INFO`.

4. (Optional) Add fields of your new task/metric for official models by modifying the `get_leaderboard_default()` function defined in `./backend/utils.py`.

### Frontend

1. Append the `individual_submission_columnInfo` array in `./frontend/src/Data.js` with:

    ```js
    ${column_name}: {
        header: "${column_name}",
        width: 100,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
    ```

2. Append the `leaderboard_columnInfo` array in `./frontend/src/Data.js` with:

    ```js
    ${column_name}: {
        header: "${column_name}",
        width: 100,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
    ```