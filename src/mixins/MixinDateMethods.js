export default {
    methods: {
        mixinDateMethods_Humanize(number, entityName) {

            const words = {
                years: ["год", "года", "лет"],
                months: ["месяц", "месяца", "месяцев"],
                days: ["день", "дня", "дней"],
                hours: ["час", "часа", "часов"],
                minutes: ["минута", "минуты", "минут"]
            }

            if (words[entityName] === undefined) {
                return "";
            }

            const n = number%10;

            switch (n) {
                case 1:
                    return words[entityName][0];
                case 2:
                case 3:
                case 4:
                    return words[entityName][1];
                default:
                    return words[entityName][2];
            }
        },
    }
}