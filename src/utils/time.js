export const formatTime = (date) => {
    const newDate = new Date(date)
    const month = newDate.getMonth() + 1
    const monthStr = month < 10 ? `0${month}` : month
    return `${newDate.getDate()}.${monthStr}.${newDate.getFullYear()}`
}