import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight as colorTheme } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Section } from "./components/Sections";
import { HashLink } from 'react-router-hash-link';
import policy from "./policy";



const useStyles = makeStyles((theme) => ({
    image: {
        width: "400",
        height: "500",
        marginBottom: theme.spacing(2),
    },
}));

function Challenge(props) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Section margin={theme.spacing(8, "auto", 1)} align="left">
                <ReactMarkdown
                    children={policy}
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    language={match[1]}
                                    PreTag="div"
                                    style={colorTheme}
                                    showLineNumbers={true}
                                    {...props}
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        },
                        a({ href, children, ...props }) {
                            const match = /.*superbbenchmark\.org\/\w+/.exec(href || '')
                            return match ? (
                                <HashLink to={match[0].replace(/.*superbbenchmark\.org/, "") + "#top"} {...props}>
                                    {children}
                                </HashLink>
                            ) : (
                                <a href={href} {...props}>
                                    {children}
                                </a>
                            )
                        }
                    }}
                />
            </Section>
        </React.Fragment >
    );
}

export default Challenge;