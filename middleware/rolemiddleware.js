// /middleware/role.js
export const roleMiddleware = (allowedRoles) => (req, res, next) => {
  // Make sure the user is authenticated first
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // Check if user's role is allowed
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  // User has permission → continue
  next();
};
