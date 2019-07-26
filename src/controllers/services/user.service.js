/* eslint-disable camelcase */
import crypto from 'crypto';
import Utils from '../../utilities/common';
import User from '../../models/user.model';
import Authservice from '../../middleware/auth.service';
import mailer from '../../utilities/mailer';

class Userservice {
  /** Signs user into account
   * @description signs user into their account
   * @param {object} a new user object
   */
  static async login(req) {
    try {
      const user = await User.findOne({ staff_email: req.email });
      if (user) {
        const bycrptResponse = Utils.validate(
          req.password,
          user.password,
        );
        if (bycrptResponse) {
          const {
            staff_id,
            first_name,
            last_name,
            is_admin,
            staff_email,
          } = user;
          const userProfile = {
            staff_id,
            is_admin,
          };
          const token = await Authservice.signJwt(userProfile);
          return {
            token,
            first_name,
            last_name,
            staff_email,
            admin: is_admin,
          };
        }
      }
      throw new Error('Invalid credentials');
    } catch (err) {
      throw err;
    }
  }

  static async addUser(req) {
    try {
      const isUser = await User.findOne({ staff_email: req.body.email });
      if (isUser) {
        throw new Error('Email is already in use');
      }


      const token = await crypto.randomBytes(20).toString('hex');

      // Message object
      const message = {
        // Comma separated list of recipients
        to: `<${req.body.email}>`,

        // Subject of the message
        subject: `Successful Account Creation ✔${Date.now()}`,

        // plaintext body
        text: 'Good day!',

        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width">
</head>
<body style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; height: 100%; background: #f8f8f8; width: 100%;">
	<table class="body-wrap" style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; height: 100%; background: #f8f8f8; width: 100%;" width="100%" height="100%">
    <tr style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
        <td class="container" style="padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; display: block; clear: both; margin: 0 auto; max-width: 580px;">
            <table style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; border-collapse: collapse; width: 100%;" width="100%">
                <tr style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
                    <td align="center" class="masthead" style="margin: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; padding: 20px 0; background: #71bc37; color: white;">

                        <h2 style="padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin-bottom: 10px; line-height: 1; font-size: 32px; max-width: 90%; margin: 0 auto;">NEMSA Web Account</h2>

                    </td>
                </tr>
                <tr style="margin: 0; padding: 0; font-size: 80%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
                    <td class="content" style="margin: 0; font-size: 80%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; background: white; padding: 30px 35px;">

                        <h2 style="margin: 0; padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin-bottom: 20px; line-height: 1.25; font-size: 28px;">Hi ${
  req.body.first_name
},</h2>

                        <p style="margin: 0; padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; font-size: 16px; font-weight: normal; margin-bottom: 20px;">A staff account has been created for you by your administrator on the NEMSA Portal. To set a password and start using your account, please, click this <a href='http://${req.headers.host}/reset/${token}'>link</a>.</p>
                        <p style="margin: 0; padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; font-size: 16px; font-weight: normal; margin-bottom: 20px;">NB: If the link expires, you can ask for a reset password link on the <a href='#'>homepage</a></p>
                        
                        <table style="margin: 0; padding: 0; font-size: 80%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; border-collapse: collapse; width: 100%;" width="100%">
                            <tr style="margin: 0; padding: 0; font-size: 80%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
                                <td align="center" style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
                                    <p style="margin: 0; padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; font-size: 16px; font-weight: normal; margin-bottom: 20px;"></p>
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>
            </table>

        </td>
    </tr>
    <tr style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
        <td class="container" style="padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; display: block; clear: both; margin: 0 auto; max-width: 580px;">
            <table style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; border-collapse: collapse; width: 100%;" width="100%">
                <tr style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
                    <td class="content footer" align="center" style="margin: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; padding: 30px 35px; background: none;">
                        <p style="margin: 0; padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; font-weight: normal; margin-bottom: 0; color: #888; text-align: center; font-size: 14px;">Sent by <a href="#" style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; color: #888; text-decoration: none; font-weight: bold;">NEMSA</a>, 1234 Yellow Brick Road, OZ, 99999</p>
                        <p style="margin: 0; padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; font-weight: normal; margin-bottom: 0; color: #888; text-align: center; font-size: 14px;"><a href="mailto:" style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; color: #888; text-decoration: none; font-weight: bold;">hello@company.com</a> | <a href="#" style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; color: #888; text-decoration: none; font-weight: bold;">Unsubscribe</a></p>
                    </td>
                </tr>
            </table>

        </td>
    </tr>
</table>
</body>

</html>`,
      };
      await mailer(message);
      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        is_admin: req.body.admin,
        staff_email: req.body.email,
        staff_id: req.body.staff_id,
        reset_password_token: token,
        reset_password_expires: Date.now() + 3600000 * 5, // Expires after a day
      });
      const createdUser = await newUser.save();
      const {
        id, first_name, last_name, is_admin, staff_email, staff_id,
      } = createdUser;
      return {
        id, first_name, last_name, is_admin, staff_email, staff_id,
      };
    } catch (err) {
      throw err;
    }
  }

  static async requestReset(req) {
    try {
      const user = await User.findOne({ staff_email: req.body.email });
      if (!user) {
        throw new Error('Sorry, this email doesn\'t seem to exist in our database');
      }

      const token = await crypto.randomBytes(20).toString('hex');
      const message = {
        // Comma separated list of recipients
        to: `NEMSA Staff <${req.body.email}>`,

        // Subject of the message
        subject: `Reset Password ✔${Date.now()}`,

        // plaintext body
        text: 'Good day!',

        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width">
</head>
<body style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; height: 100%; background: #f8f8f8; width: 100%;">
	<table class="body-wrap" style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; height: 100%; background: #f8f8f8; width: 100%;" width="100%" height="100%">
    <tr style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
        <td class="container" style="padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; display: block; clear: both; margin: 0 auto; max-width: 580px;">
            <table style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; border-collapse: collapse; width: 100%;" width="100%">
                <tr style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
                    <td align="center" class="masthead" style="margin: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; padding: 20px 0; background: #71bc37; color: white;">

                        <h2 style="padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin-bottom: 10px; line-height: 1; font-size: 32px; max-width: 90%; margin: 0 auto;">NEMSA Web Account</h2>

                    </td>
                </tr>
                <tr style="margin: 0; padding: 0; font-size: 80%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
                    <td class="content" style="margin: 0; font-size: 80%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; background: white; padding: 30px 35px;">

                        <h2 style="margin: 0; padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin-bottom: 20px; line-height: 1.25; font-size: 28px;">Hi ${
  user.first_name
},</h2>

                        <p style="margin: 0; padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; font-size: 16px; font-weight: normal; margin-bottom: 20px;">Someone requested a reset password link, if you didn't you can ignore this mail, else click this <a href='http://${
  req.headers.host
}/reset/${token}'>link</a>.</p>
                        <p style="margin: 0; padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; font-size: 16px; font-weight: normal; margin-bottom: 20px;">NB: If the link expires, you can ask for a reset password link on the <a href='#'>homepage</a></p>
                        
                        <table style="margin: 0; padding: 0; font-size: 80%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; border-collapse: collapse; width: 100%;" width="100%">
                            <tr style="margin: 0; padding: 0; font-size: 80%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
                                <td align="center" style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
                                    <p style="margin: 0; padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; font-size: 16px; font-weight: normal; margin-bottom: 20px;"></p>
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>
            </table>

        </td>
    </tr>
    <tr style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
        <td class="container" style="padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; display: block; clear: both; margin: 0 auto; max-width: 580px;">
            <table style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; border-collapse: collapse; width: 100%;" width="100%">
                <tr style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
                    <td class="content footer" align="center" style="margin: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; padding: 30px 35px; background: none;">
                        <p style="margin: 0; padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; font-weight: normal; margin-bottom: 0; color: #888; text-align: center; font-size: 14px;">Sent by <a href="#" style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; color: #888; text-decoration: none; font-weight: bold;">NEMSA</a>, 1234 Yellow Brick Road, OZ, 99999</p>
                        <p style="margin: 0; padding: 0; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; font-weight: normal; margin-bottom: 0; color: #888; text-align: center; font-size: 14px;"><a href="mailto:" style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; color: #888; text-decoration: none; font-weight: bold;">hello@company.com</a> | <a href="#" style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; color: #888; text-decoration: none; font-weight: bold;">Unsubscribe</a></p>
                    </td>
                </tr>
            </table>

        </td>
    </tr>
</table>
</body>

</html>`,
      };
      await mailer(message);
      await User.updateOne(
        { staff_email: req.body.email },
        {
          $set: {
            reset_password_token: token,
            reset_password_expires: Date.now() + 3600000 * 5,
          },
        },
      );
      const {
        id,
        first_name,
        last_name,
        is_admin,
        staff_email,
        staff_id,
      } = user;
      return {
        id,
        first_name,
        last_name,
        is_admin,
        staff_email,
        staff_id,
      };
    } catch (err) {
      throw err;
    }
  }

  static async reset(req) {
    try {
      const user = await User.findOne({ reset_password_token: req.params.token });
      if (!user) throw new Error('Please request for a reset password link');
      if ((user.reset_password_expires - new Date()) / (3600000 * 5) > 5) {
        throw new Error(
          'Link has expired, please request for a reset password link',
        );
      }
      const password = await Utils.hash(req.body.password);
      await User.updateOne(
        {
          reset_password_token: req.params.token,
        },
        {
          $set: {
            password,
            reset_password_token: undefined,
            reset_password_expires: undefined,
          },
        },
      );
      const {
        id,
        first_name,
        last_name,
        is_admin,
        staff_email,
        staff_id,
      } = user;
      return {
        id,
        first_name,
        last_name,
        is_admin,
        staff_email,
        staff_id,
      };
    } catch (err) {
      throw err;
    }
  }

  static async getAllUsers(req) {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      throw err;
    }
  }

  static async getOneUser(req) {
    try {
      const { id } = req;
      const user = await User.findOne({ staff_id: id });
      if (!user) throw new Error('ID does not exist');
      return user;
    } catch (err) {
      throw err;
    }
  }

  static async deleteUser(req) {
    try {
      const { id } = req;
      const user = await User.findOne({ staff_id: id });
      if (!user) throw new Error('ID does not exist');
      await User.deleteOne({ staff_id: id });
      const {
        first_name,
        last_name,
        is_admin,
        staff_email,
        staff_id,
      } = user;
      return {
        first_name,
        last_name,
        is_admin,
        staff_email,
        staff_id,
      };
    } catch (err) {
      throw err;
    }
  }
}
export default Userservice;
