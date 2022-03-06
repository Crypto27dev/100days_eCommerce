const joinUrl = (...args) => {
    return args
        .map((item, idx) => {
            let tItem = item;
            if (tItem.startsWith('/') && idx > 0) tItem = tItem.slice(1);
            if (tItem.endsWith('/')) tItem = tItem.slice(0, -1);
            return tItem;
        })
        .join('/');
};

export default joinUrl;
