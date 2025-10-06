// Safe debug middleware to log all registered routes
export const logRoutes = (app) => {
  if (!app._router) {
    console.warn("⚠️ app._router is undefined. Make sure routes are mounted first.");
    return;
  }

  console.log("🔎 Registered routes:");
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Directly registered route
      const methods = Object.keys(middleware.route.methods).join(", ");
      console.log(`➡️ ${methods.toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === "router") {
      // Routes added via router.use()
      middleware.handle.stack.forEach((handler) => {
        const route = handler.route;
        if (route) {
          const methods = Object.keys(route.methods).join(", ");
          console.log(`➡️ ${methods.toUpperCase()} ${route.path}`);
        }
      });
    }
  });
};
