import React from "react";
import { formatDate } from "../utils/api/_DATA";
import { useNavigate } from "react-router-dom";

const PollItem = ({ author, timestamp, id }) => {
    const navigate = useNavigate();
    return (
        <div className="poll-info">
            <div>
                <span>{author}</span>
                <div>{formatDate(timestamp)}</div>
                <button className="poll-btn" onClick={() => navigate(`/polls/${id}`)}>
                    Show
                </button>
            </div>
        </div>
    );
};

export default PollItem;
