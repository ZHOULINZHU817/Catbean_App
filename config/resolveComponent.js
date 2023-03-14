export default function resolveComponent(routers, menus) {
	for (let i = 0; i < routers.length; i++) {
		if (routers[i].path !== null) {
			if (hasPermission(menus, routers[i]) && routers[i].path.indexOf('/APP_application') !== -1) {
				delete routers[i].href
				delete routers[i].orderNum
				delete routers[i].parentCode
				delete routers[i].parentId
				delete routers[i].props
				delete routers[i].redirect
				delete routers[i].select
				routers[i].meta = routers[i].meta || {};
				routers[i].meta.title = routers[i].meta.title || routers[i].title;
				routers[i].icon = routers[i].meta.icon = routers[i].meta.icon || 'basicData';
				routers[i].name = routers[i].authority;

				if (routers[i].children.length > 0 && Array.isArray(routers[i].children)) {
					resolveComponent(routers[i].children, menus);
				}
			} else {
				routers.splice(i--, 1);
			}
		}
	}
	return routers;
}

function hasPermission(menus, route) {
	if (route.authority) {
		return !!menus.some((item) => {
			return item === route.authority
		});
	} else {
		return true
	}
}
