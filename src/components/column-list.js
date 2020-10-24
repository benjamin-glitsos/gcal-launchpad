import PropTypes from "prop-types";
import { Flex, Box } from "rebass";
import { minOfOne } from "~/lib/utilities";
import styled from "@emotion/styled";
import ConditionalWrap from "~/components/conditional-wrap";
import CustomTypes from "~/lib/prop-types";

const Ul = styled.ul`
    columns: ${props => props.columns || 2};
    margin-bottom: 2em;

    @media(max-width: ${process.env.breakpoints[2]}) {
        columns: ${minOfOne(props => props.columns - 1)}
    }

    @media(max-width: ${process.env.breakpoints[1]}) {
        columns: ${minOfOne(props => props.columns - 2)}
    }

    @media (max-width: ${process.env.breakpoints[0]}) {
        columns: 1;
        ${props =>
            (props.centerOnMobile || false) &&
            `
                text-align: center;
                list-style: none;
                li {
                    margin-bottom: 0.5em;
                }
                `}
`;

export default function ColumnList({ columns, centerOnMobile, children }) {
    return (
        <Ul columns={columns} centerOnMobile={centerOnMobile}>
            {children.map((Child, i) => (
                <li key={i}>{Child}</li>
            ))}
        </Ul>
    );
}

ColumnList.propTypes = {
    columns: PropTypes.number,
    centerOnMobile: PropTypes.bool,
    children: PropTypes.node.isRequired
};
