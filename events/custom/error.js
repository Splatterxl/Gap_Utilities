export class error {
    errorMessages = require("../../assets/errors.json");

    constructor(value) {
        switch (value) {
            case 1:
                this.value = errorMessages.array[0]
        }
    }
}