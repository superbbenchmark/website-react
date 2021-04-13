import React from 'react';
import { HashLink } from 'react-router-hash-link';

export default function AdaptiveLink(props) {
    const { link, children, disabled } = props;
    const Link = disabled ? React.Fragment : HashLink;
    return (
        link.includes("http") ?
            <a className="unlink" href={disabled ? null : link} target="_blank">
                {children}
            </a>
            :
            <Link className="unlink" to={link}>
                {children}
            </Link>
    )
}