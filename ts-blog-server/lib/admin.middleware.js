
// SECURITY GUARD (=Türsteher)
export const isAdmin = (req, res, next) => {

  // authenticated user is already stored in req.user
  if(req.user.role !== "admin") {
    return res.status(403).json({
      error: "Bist kein Admin? Werde einer! Frag Gael"
    }) // 403 no permission / forbidden
  }

  next() // user is admin! => move forward
}