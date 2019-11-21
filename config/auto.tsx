
const memory = {
    name: 'memory',
    type: 'string[]'
}
export const memoryState = {
    'name': memory.name,
    'type': memory.type,
    'default': []
}
export const setMemory = {
    'method': 'setMemory',
    'parameter': memory.name,
    'parmType': memory.type
}

