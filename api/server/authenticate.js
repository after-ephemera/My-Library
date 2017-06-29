import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jwt-simple';
import { ObjectId } from 'mongodb';
import nodeify from 'nodeify';
import bcrypt from 'bcrypt';

const KEY = '0.07052223420899795';

async function userFromPayload(request, jwtPayload) {
  if (!jwtPayload.userId) {
    throw new Error('No userId in JWT');
  }

  return await request.context.User.findOneById(ObjectId(jwtPayload.userId));
}

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: KEY,
  passReqToCallback: true,
}, (request, jwtPayload, done) => {
  nodeify(userFromPayload(request, jwtPayload), done);
}));

export default function addPassport(app) {
  app.use(passport.initialize());

  app.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error('Username or password not set on request');
      }

      const user = await req.context.User.collection.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.hash))) {
        res.status(404).json({something: 'something'});
        throw new Error('User not found matching email/password combination');
      }

      const payload = {
        userId: user._id.toString(),
      };

      // Remove the hash so we can send back the user.
      const {hash, ...userSimple} = user;
      const token = jwt.encode(payload, KEY);
      res.json({ token, user:userSimple });
    } catch (e) {
      next(e);
    }
  });
}
