
const SavingProgress = ({data}) => {
    const {reached, goal} = data
    return (
        <div className="saving-progress">
            <div className="progress-bar">
                <div
                    style={{width: reached / goal * 100 + '%'}}
                    className="progress-track"></div>
            </div>
        </div>
    )
}

export default SavingProgress;