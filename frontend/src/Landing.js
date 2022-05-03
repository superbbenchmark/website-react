import React, { useRef, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import { Typography, Link, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Section, SubSection, SubSubSection } from "./components/Sections";
import { DescriptionButton } from "./components/Buttons";
import { Strong } from "./components/Utilies";
import { subscribe_link } from "./Data";
import YouTube from 'react-youtube';
import { Title } from "./components/Titles";
import { HashLink } from "react-router-hash-link";

export default function Landing(props) {
    const theme = useTheme();
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(ref.current.offsetWidth)
    }, []);

    const videoWidth = Math.min(width, 700)
    const opts = {
        height: videoWidth / 1920 * 1080,
        width: videoWidth,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    return (
        <Box ref={ref} margin={theme.spacing(0, 0, 8)}>
            <Box margin={theme.spacing(8, "auto", 1)}>
                <img src="logo-color.png" style={{width: "40%", textAlign: "left"}} />
            </Box>
            <Box margin={theme.spacing(1, "auto", 6)}>
                <Typography
                    variant={
                        useMediaQuery(theme.breakpoints.up("sm")) ? "h4" : "h5"
                    }
                    color="textPrimary"
                >
                    <strong>S</strong>peech processing <strong>U</strong>
                    niversal <strong>PER</strong>formance <strong>B</strong>
                    enchmark
                </Typography>
            </Box>
            <Box margin={theme.spacing(1, "auto", 6)}>
                <p><strong><a href={subscribe_link} target="_blank" rel="noopener noreferrer">Subscribe</a></strong> our e-news to receive all the latest information about SUPERB or <strong>contact us</strong> via</p>
                <p><strong><a href="mailto:superb.announcement@gmail.com" target="_blank">superb.announcement@gmail.com</a></strong></p>
            </Box>
            <Box maxWidth={800} margin={theme.spacing(1, "auto", 6)}>
                <Typography variant="h6" color="textPrimary">
                    <strong>SLT2022 SUPERB Challenge Timeline</strong>
                </Typography>
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
                    <li><span><Strong>Dec 1, 2022</Strong>: System description paper deadline</span></li>
                    <li><span><Strong>Dec 25, 2022</Strong>: Challenge result and inviter announcement</span></li>
                    <li><span>Jan 9 - 12, 2023: </span><a href="https://slt2022.org/" target="_blank"
                        rel="noopener"><span>SLT workshop</span></a><span> presentation</span></li>
                </ul>
            </span>
            </Box>
            <YouTube videoId="zd9fiVvej0k" opts={opts} />
            <Box maxWidth={800} margin="auto" textAlign="left">
                <SubSection>
                    <SubSubSection>
                        <Typography
                            component={"span"}
                            variant="body1"
                            color="textSecondary"
                        >
                            SUPERB is a collection of benchmarking resources to
                            evaluate the capability of a universal shared
                            representation for speech processing. SUPERB
                            consists of the following:
                            <div
                                style={{
                                    width: "fit-content",
                                    margin: "auto",
                                    textAlign: "left",
                                }}
                            >
                                <ol>
                                    <li>
                                        A benchmark of ten speech processing
                                        tasks[1] built on established public
                                        datasets,
                                    </li>
                                    <li>
                                        A
                                        <DescriptionButton
                                            name={<a>benchmark toolkit</a>}
                                            link={
                                                "https://github.com/s3prl/s3prl"
                                            }
                                        />
                                        designed to evaluate and analyze
                                        pretrained model performance on various
                                        downstream tasks following the
                                        conventional evaluation protocols from
                                        speech communities,
                                    </li>
                                    <li>
                                        A public
                                        <DescriptionButton
                                            name={<a>leaderboard</a>}
                                            link="/leaderboard"
                                        />
                                        for{" "}
                                        <DescriptionButton
                                            name={<a>submissions</a>}
                                            link="/submit"
                                        />
                                        and performance tracking on the
                                        benchmark.
                                    </li>
                                </ol>
                            </div>
                        </Typography>
                    </SubSubSection>
                    <SubSubSection>
                        <Typography variant="body1" color="textSecondary">
                            SUPERB aims to offer the community a standard and
                            comprehensive framework to train, evaluate, and
                            compare the generalizability of universal speech
                            representations on speech processing tasks. A
                            universal speech representation can be leveraged to
                            quickly adapt to diverse downstream tasks with
                            minimum architectural change and downstream
                            fine-tuning, so as to reduce the model development
                            cycle time for new tasks.To emphasize on evaluating
                            the quality of the learned universal representation,
                            SUPERB puts an explicit constraint on the downstream
                            model and limits its parameter size.
                        </Typography>
                    </SubSubSection>
                    <SubSubSection>
                        <Typography variant="body1" color="textSecondary">
                            The ultimate goal of SUPERB is to democratize the
                            advancement in speech processing with powerful,
                            generalizable, and reusable speech representations.
                            SUPERB is a long-term maintained and continuously
                            developing project. As we are gradually releasing
                            new tasks and opening new tracks, we invite
                            researchers to participate in the challenge and
                            advance the research frontier together.
                        </Typography>
                    </SubSubSection>
                </SubSection>
                <SubSection>
                    <Grid container justify="space-evenly" spacing={0}>
                        {[
                            ["ntu-1000.png", "https://www.ntu.edu.tw/english/"],
                            ["cmu-1000.png", "https://www.cmu.edu/"],
                            ["mit-1000.png", "https://www.mit.edu/"],
                            ["jhu-1000.png", "https://www.jhu.edu/"],
                            ["fair-1000.png", "https://ai.facebook.com/"],
                            ["lxt-1000.png", "https://www.lxt.ai/"],
                            ["huggingface-1000.png", "https://huggingface.co/"]
                        ].map((filename) => {
                            return (
                                <Grid item xs={6} sm={4} md={4} key={filename[0]}>
                                    <a target="_blank" href={filename[1]}>
                                        <img src={filename[0]} width="100%" />
                                    </a>
                                </Grid>
                            );
                        })}
                    </Grid>
                </SubSection>
                <Box margin={theme.spacing(8, 0)} textAlign="center">
                    <Title title="Acknowledgement"/>
                    <Typography variant="body1" color="textSecondary">
                        We thank <DescriptionButton name={<a>Ming-Yang Ho</a>} link="https://kaminyou.com/" /> for creating and maintaining the SUPERB official website.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
