export default pass => {
    if(typeof pass !== 'string') {
        return {valid: false, reason: 'Invalid string'};
    }
    if(pass.length < 8) {
        return {valid: false, reason: 'Your password must be at least 8-character long.'}
    }
    return {valid: true, reason: 'Nice password'};
}