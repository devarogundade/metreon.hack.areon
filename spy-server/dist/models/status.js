"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["INITIATED"] = 0] = "INITIATED";
    Status[Status["PROCESSING"] = 1] = "PROCESSING";
    Status[Status["DELIVERED"] = 2] = "DELIVERED";
    Status[Status["FAILED"] = 3] = "FAILED";
    Status[Status["RETRY"] = 4] = "RETRY";
    Status[Status["RETRYING"] = 5] = "RETRYING";
})(Status || (exports.Status = Status = {}));
