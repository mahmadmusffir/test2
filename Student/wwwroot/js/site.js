function showNotification(from, align, message, icon, color) {

    $.notify({
        icon: icon,
        message: message

    },
        {
            type: color,
            timer: 2000,
            z_index: 99999,
            placement: {
                from: from,
                align: align
            }
        });
}