import passport from 'passport';

export const isAuthenticated = passport.authenticate('bearer', { session: false });
