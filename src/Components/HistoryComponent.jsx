import {useSelector} from "react-redux";


export function HistoryComponent() {
    const historyItems = useSelector(state => state.historyReducer.value) ?? []
    return (
        <div>
            <div className="fs-3">History</div>
            <div className="d-flex flex-column">
                {historyItems.map((item, index) => {
                    return (
                        <div key={index} className="d-">
                            <span className="me-3">{item.type}</span>
                            <span className="">{item.text}</span>
                        </div>
                    )
                })}
            </div>
        </div>)
}