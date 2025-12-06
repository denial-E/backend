export const roleMiddleware=(allowedRoles)=> {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(500).json({ message: "Role not found" });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(500).json({ message: "Access denied: Insufficient permissions" });
      }
      next();
  };
}


