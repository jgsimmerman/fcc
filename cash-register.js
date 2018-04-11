function checkCashRegister(price, cash, cid) {
    const cidTotal = cid.reduce((acc, item) => acc + item[1], 0);
    const change = cash - price;
    const returnedChange = [];
    const output = {
        status: null,
        change: []
    };

    if (change === cidTotal) {
        output.status = 'CLOSED'
        output.change = cid;
        return output
    }

    class CashRegister {
        constructor() {
            this.head = null;
            this.tail = null;
        }

        addToHead(typeAmount) {
            const newCurrency = new AvailableCurrency(typeAmount, this.head, null);
            if (this.head) this.head.prev = newCurrency;
            else this.tail = newCurrency;
            this.head = newCurrency;
        }

        calcChange(changeNeeded) {
            let currentCurrency = this.head;

// Refactor While Loops
            while (changeNeeded >= 0 && currentCurrency) {
                const temp = [currentCurrency.value[0], 0];
                while (currentCurrency.decrementBy <= changeNeeded && currentCurrency.value[1]) {
                    changeNeeded = changeNeeded.toFixed(2) - currentCurrency.decrementBy;
                    currentCurrency.value[1] = currentCurrency.value[1].toFixed(2) - currentCurrency.decrementBy;
                    temp[1] += currentCurrency.decrementBy;
                }
                temp[1] ? returnedChange.push(temp) : '';
                currentCurrency = currentCurrency.next;
            }
            if (changeNeeded > 0) {
                {
                    output.status = 'INSUFFICIENT_FUNDS';
                    output.change = [];
                    return output
                }
            }

            output.status = 'OPEN';
            output.change = returnedChange;
            return output

        }
    }
// Refactor Switch Statement
    function AvailableCurrency(value, next, prev) {
        this.value = value;
        this.next = next;
        this.prev = prev;
        switch (value[0]) {
            case "ONE HUNDRED":
                this.decrementBy = 100;
                break;
            case "TWENTY":
                this.decrementBy = 20;
                break;
            case "TEN":
                this.decrementBy = 10;
                break;
            case "FIVE":
                this.decrementBy = 5;
                break;
            case "ONE":
                this.decrementBy = 1;
                break;
            case "QUARTER":
                this.decrementBy = 0.25;
                break;
            case "DIME":
                this.decrementBy = 0.10;
                break;
            case "NICKEL":
                this.decrementBy = 0.05;
                break;
            case "PENNY":
                this.decrementBy = 0.01;
                break;
        }
    }

    const register = new CashRegister();
    cid.forEach(currency => {
        register.addToHead(currency);
    });

    return register.calcChange(change);
}

checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]);


checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
