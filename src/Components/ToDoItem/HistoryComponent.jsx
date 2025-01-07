import {useSelector} from "react-redux";


export function HistoryComponent() {
    const historyItems = useSelector(state => state.historyReducer.value) ?? []
    return (
        <div>
            <div className="fs-3">History</div>
            <div className="d-flex flex-column">
                {historyItems.map((item, index) => {
                    return (
                        <div key={index} className="d-flex">
                            <div className="me-3">{item.type}</div>
                            <div>{item.text}</div>
                        </div>
                    )
                })}
            </div>
        </div>)
}