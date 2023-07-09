export const getMemorizedData = async () => {
    return fetch('https://localhost:3001/number')
        .then(res => res.json())
} 

export const putMemorizedData = async (data: any) => {
    return fetch('https://localhost:3001/number', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}