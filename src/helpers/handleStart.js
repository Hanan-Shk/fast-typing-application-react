const handleStart = (setStarted, setEnded, setInput, quote, inputRef, setTimer) => {
    setStarted(true)
    setEnded(false)
    setInput(quote.quote)
    inputRef.current.focus()
    setTimer()
}

export default handleStart;