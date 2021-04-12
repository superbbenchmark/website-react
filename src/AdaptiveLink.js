import { Link } from 'react-router-dom';

export default function AdaptiveLink(props) {
    const { link, children } = props;
    return (
        link.includes("http") ?
            <a className="unlink" href={link} target="_blank">
                {children}
            </a>
            :
            <Link className="unlink" to={link}>
                {children}
            </Link>
    )
}