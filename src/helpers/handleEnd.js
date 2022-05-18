const handleEnd = (setEnded, setStarted, interval) => {
    setEnded(true)
    setStarted(false)
    clearInterval(interval)
}

export default handleEnd;