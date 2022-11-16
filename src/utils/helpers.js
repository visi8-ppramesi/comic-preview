export default {
    compactFormatter(number, locale = 'id'){
        let formatter = Intl.NumberFormat(locale, { notation: 'compact' });
        return formatter.format(number)
    },
    formatDate(date){
        return (new Date(date)).toLocaleDateString('id')
    }
}