export const getMemorizedData = async () => {
    return fetch('http://localhost:3001/number')
        .then(res => res.json())
} 

export const putMemorizedData = async (data: string) => {
    return fetch('http://localhost:3001/number', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"number": data})
    })
}