export class Parameters {

    static noImgUrl = process.env.publicPath+'/assets/images/no-img.png';

    static getWeekDays() {
        return [
            {value: 1, title: 'Monday',},
            {value: 2, title: 'Tuesday',},
            {value: 3, title: 'Wednesday',},
            {value: 4, title: 'Thursday',},
            {value: 5, title: 'Friday',},
            {value: 6, title: 'Saturday',},
            {value: 7, title: 'Sunday',},
        ];
    }

    static getStatusList() {
        return [
            {value: '0', label: 'InActive', color: '#ffd600'},
            {value: '1', label: 'Active', color: '#2dce89'},
        ];
    }

    static productPositions() {
        return [
            {value: 1, label: 'Left', color: '#ffd600'},
            {value: 2, label: 'Center', color: '#2dce89'},
            {value: 3, label: 'Right', color: '#2dce89'},
        ];
    }

    static getRoleList() {
        return [
            {value: '', label: 'All', color: '#fff'},
            {value: '1', label: 'Moderator', color: '#2dce89'},
            {value: '2', label: 'Employee', color: '#ffd600'},
            {value: '3', label: 'User', color: '#ffd600'},
        ];
    }

    static getMonths() {
        return [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
    }


}
