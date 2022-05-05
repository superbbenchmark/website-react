import React from "react";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { HashLink } from 'react-router-hash-link';
import 'katex/dist/katex.min.css'

import { Section } from "./components/Sections";
import { Title } from "./components/Titles";
import { Strong } from "./components/Utilies";
import { subscribe_link } from "./Data";


const news = [
    // {
    //     title: "This is a markdown block",
    //     date: new Date(2021, 8, 2),
    //     content: (
    //         markdown
    //     ),
    // },
    // {
    //     title: "This is for leaderboard test",
    //     date: new Date(2021, 9, 20),
    //     content: (
    //         <span>
    //             <HashLink to="/leaderboard#paper">paper</HashLink><br />
    //             <HashLink to="/leaderboard#public-set">Public Set</HashLink><br />
    //             <HashLink to="/leaderboard#hidden-dev-set">Hidden Dev Set</HashLink><br />
    //         </span >
    //     ),
    // },
    {
        title: "SLT2022 SUPERB Challenge Timeline",
        date: new Date(2022, 4, 2),//y,m(0~11),d,h,m,s,ms
        content: (
            <span align="left">
                <HashLink to="/challenge-slt2022/challenge_overview#top">Challenge Policy</HashLink>
                <ul>
                    <li><span><Strong>Mar 2, 2022</Strong>: <HashLink to="/news#announcement2022">Challenge announcement</HashLink></span>
                    </li>
                    <li><Strong>Mar 2, 2022</Strong>: <HashLink to="/leaderboard?subset=Public+Set">Leaderboard</HashLink>
                        <span> is online and accepts submissions</span>
                    </li>
                    <li><span><Strong>Jul 15, 2022</Strong>: </span><a href="https://slt2022.org/" target="_blank"
                        rel="noopener"><span>SLT workshop</span></a><span> paper submission (encouraged)</span></li>
                    <li><span><Strong>Sep 30, 2022</Strong>: </span><a href="https://slt2022.org/" target="_blank"
                        rel="noopener"><span>SLT workshop</span></a><span> paper notification</span>
                    </li>
                    <li><span><Strong>Nov 1, 2022</Strong>: System description paper deadline</span></li>
                    <li><span><Strong>Dec 20, 2022</Strong>: Challenge result and invitee announcement</span></li>
                    <li><span>Jan 9 - 12, 2023: </span><a href="https://slt2022.org/" target="_blank"
                        rel="noopener"><span>SLT workshop</span></a><span> presentation</span></li>
                </ul>
            </span>),
    },
    {
        //TODO: remove split, check paper submission desp, add SLT paper submission suggest
        title: "Announcing 2022 SLT SUPERB Challenge",
        id: "announcement2022",
        date: new Date(2022, 4, 2),
        content: (
            <span align="left">
                <div>
                    We are pleased to announce that the <Strong>SLT 2022 SUPERB Challenge</Strong> will be kicked off in today <Strong>May 2 2022</Strong> and the results will be presented in <Strong>January 9~12 2023</Strong> in a reserved session at <a href="https://slt2022.org/" target="_blank" rel="noopener">The IEEE Workshop on Spoken Language Technology (SLT)</a> in Doha, Qatar. The challenge policy can be found at the <HashLink to="/challenge-slt2022/challenge_overview#top">Challenge</HashLink> tag.
                </div>
                <br />
                <div>
                    All the participants are <Strong>encouraged to submit papers to <a href="https://slt2022.org/" target="_blank" rel="noopener">The IEEE Workshop on Spoken Language Technology (SLT)</a></Strong>. And optionally, participants may also choose to <Strong>submit system description papers to a separate Challenge Proceedings</Strong>. Review of these papers will be the responsibility of our SUPERB challenge organisers. Accepted system description papers will not be indexed by the IEEE, but authors of these papers will have the opportunity to present their work in a dedicated session at the Workshop.
                </div>
                <br />
                <div>
                    Workshop papers will be reviewed and acceptance will be determined based on the quality of the work. Participants can obtain results on hidden dataset through the challenge’s model submission system that will be open from <Strong>now</Strong> all the way to at least <Strong>Dec 31, 2022</Strong>. Authors of the accepted papers should update hidden set results in their paper, and send the final paper to the organizers for verification by <Strong>Nov 1, 2022</Strong>. Performance on the hidden set will not be judged during the verification process.
                </div>
            </span >
        ),
    },
    {
        title: "2021 SUPERB Challenge Timeline",
        date: new Date(2021, 8, 18),//y,m(0~11),d,h,m,s,ms
        content: (
            <span align="left">
                <HashLink to="/challenge-aaai2022#top">Challenge Policy</HashLink>
                <ul>
                    <li><span><Strong>Sep 18, 2021</Strong>: <HashLink to="/news#announcement2021">Challenge announcement</HashLink> &amp; </span><a
                        href="https://github.com/s3prl/s3prl" target="_blank" rel="noopener"><span>S3PRL</span></a><span> released</span></li>
                    <li><span><Strong>Sep 30, 2021</Strong>: Overall metrics announcement &amp; </span>
                        <HashLink to="/leaderboard?subset=Public+Set">public-set leaderboard</HashLink>
                        <span> is online and accepts submissions</span></li>
                    <li><span><Strong>Oct 15, 2021</Strong>: Hidden-set leaderboard is online and accepts submissions</span></li>
                    <li><span><Strong>Nov 12, 2021</Strong>: </span><a href="https://aaai-sas-2022.github.io/" target="_blank"
                        rel="noopener"><span>AAAI workshop</span></a><span> paper submission deadline (encouraged)</span></li>
                    <li><span><Strong>Dec 3, 2021</Strong>: </span><a href="https://aaai-sas-2022.github.io/" target="_blank"
                        rel="noopener"><span>AAAI workshop</span></a><span> paper acceptance / rejection announcement</span>
                    </li>
                    <li><span><Strong>Jan 10, 2022</Strong>: Hidden-set leaderboard submission deadline</span></li>
                    <li><span><Strong>Jan 13, 2022</Strong>: Submission selection &amp; system description paper deadline</span></li>
                    <li><span><Strong>Jan 20, 2022</Strong>: Winner announcement &amp; reveal hidden-set private scores</span></li>
                    <li><span><Strong>Jan 22, 2022</Strong>: AAAI late </span><a href="https://aaai.org/Conferences/AAAI-21/registration/"
                        target="_blank" rel="noopener"><span>registration</span></a><span> deadline</span></li>
                    <li><span>Feb 28 - Mar 1, 2022: </span><a href="https://aaai-sas-2022.github.io/" target="_blank"
                        rel="noopener"><span>AAAI workshop</span></a><span> presentation</span></li>
                </ul>
            </span>),
    },
    {
        title: "Announcing 2021 SUPERB Challenge",
        id: "announcement2021",
        date: new Date(2021, 8, 18),
        content: (
            <span align="left">
                <div>
                    We are pleased to announce that the <Strong>2021 SUPERB Challenge</Strong> will be kicked off in <Strong>Oct 2021</Strong> and the results will be presented in <Strong>February 2022</Strong> in a reserved session at <a href="https://aaai-sas-2022.github.io" target="_blank" rel="noopener">The 2nd Self-supervised Learning for Audio and Speech Processing workshop at AAAI</a> in Vancouver.The challenge policy can be found at <HashLink to="/challenge-aaai2022#top">here</HashLink>.Submission system will be open in early <Strong>Oct 2021</Strong>.
                </div>
                <br />
                <div>
                    We encourage participants to submit (non-archival, cross-submission is possible after consulting organizers) workshop papers to share their results with the community and inspire future collaborations.
                    In light of the tight AAAI deadlines, we encourage participants to submit papers based on results from the development dataset of the challenge, which is publicly available and can be evaluated directly by the
                    participants. Workshop papers will be reviewed and acceptance will be determined based on the quality of the work. Participants can obtain results on hidden (surprise) dataset through the challenge’s model submission system that will be open from <Strong>Oct 2021</Strong> all the way to <Strong>Jan 2022</Strong>. Authors of the accepted papers should update hidden set results in their paper, and send the final paper to the organizers for verification by <Strong>Jan 13, 2022</Strong>. Performance on the hidden set will not be judged during the verification process.
                </div>
            </span >
        ),
    },
]

const useStyles = makeStyles((theme) => ({
    taskName: {
        fontWeight: "bold",
        marginBottom: theme.spacing(2),
    },
}));

function Post(props) {
    return (
        <ThemeProvider>
            <Box maxWidth={1000} margin="auto">
                <Section id={props.id}>
                    <Title
                        title={props.title
                        }
                        titleVariant="h5"
                        divider={true}
                        color="textPrimary"
                    />
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        align="right"
                        style={{ fontSize: 10 }}
                    >
                        <Box fontStyle="italic">published on {props.date.toDateString()}
                        </Box>
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                    >
                        {props.content}
                    </Typography>

                </Section>
            </Box>
        </ThemeProvider >
    )
}

function News(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <React.Fragment>
            <Section margin={theme.spacing(8, "auto", 1)}>
                <Title
                    title="News"
                    description={
                        <span><Strong><a href={subscribe_link} target="_blank" rel="noopener noreferrer">Subscribe</a></Strong> our e-news to receive all the latest information about SUPERB.</span>
                    }
                />
            </Section>
            {news.map(Post)}

        </React.Fragment >
    );
}

export default News;