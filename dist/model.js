export var PoorLevel;
(function (PoorLevel) {
    PoorLevel[PoorLevel["notPoor"] = 0] = "notPoor";
    PoorLevel[PoorLevel["poor"] = 1] = "poor";
    PoorLevel[PoorLevel["veryPoor"] = 2] = "veryPoor";
})(PoorLevel || (PoorLevel = {}));
export var StaffAuthority;
(function (StaffAuthority) {
    StaffAuthority["transcationOp"] = "transaction";
    StaffAuthority["admin"] = "admin";
})(StaffAuthority || (StaffAuthority = {}));
var PointChangeReason;
(function (PointChangeReason) {
    PointChangeReason["redeem"] = "redeem";
    PointChangeReason["rental"] = "rental";
    PointChangeReason["yearlyCost"] = "yearlyCost";
    PointChangeReason["volunteer"] = "volunterer";
})(PointChangeReason || (PointChangeReason = {}));
var ItemAmountChangeReason;
(function (ItemAmountChangeReason) {
    ItemAmountChangeReason["redeemed"] = "redeemed";
    ItemAmountChangeReason["rented"] = "rented";
    ItemAmountChangeReason["missing"] = "missing";
    ItemAmountChangeReason["ownUse"] = "ownUse";
})(ItemAmountChangeReason || (ItemAmountChangeReason = {}));
//# sourceMappingURL=model.js.map