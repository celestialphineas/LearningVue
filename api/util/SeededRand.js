// Multiply-with-carry
var w = 123456789;
var z0 = 987654321;
var z = z0;
var mask = 0xffffffff;

module.exports = {
    seed(i) {
        w = i;
        z = z0;
    },
    random() {
        z = (36969 * (z & 65535) + (z >> 16)) & mask;
        w = (18000 * (w & 65535) + (w >> 16)) & mask;
        var result = ((z << 16) + w) & mask;
        result /= 4294967296;
        return result + 0.5;
    }
}
