import handleEnd from './handleEnd';

const handleKeyDown = (
    e, quote, index, setIndex, setCorrectIndex, correctIndex, setInput, setIsError, outputRef, allowedKeys,
    setErrorIndex, errorIndex, duration, setAccuracy, setCpm, setWpm, setEnded, setStarted, interval
) => {
    e.preventDefault()
    const { key } = e
    const quoteText = quote.quote

    if (key === quoteText.charAt(index)) {
        setIndex(index + 1)
        const currenChar = quoteText.substring(index + 1, index + quoteText.length)
        setInput(currenChar)
        setCorrectIndex(correctIndex + 1)
        setIsError(false)
        outputRef.current.innerHTML += key
    } else {
        if (allowedKeys.includes(key)) {
            setErrorIndex(errorIndex + 1)
            setIsError(true)
            outputRef.current.innerHTML += `<span class="text-danger">${key}</span>`
        }
    }

    const timeRemains = ((60 - duration) / 60).toFixed(2)
    const _accuracy = Math.floor((index - errorIndex) / index * 100)
    const _wpm = Math.round(correctIndex / 5 / timeRemains)

    if (index > 5) {
        setAccuracy(_accuracy)
        setCpm(correctIndex)
        setWpm(_wpm)
    }

    if (index + 1 === quoteText.length || errorIndex > 50) {
        handleEnd(setEnded, setStarted, interval);
    }
}

export default handleKeyDown;