// import { Injectable } from '@nestjs/common';
// import { MailerService } from '@nestjs-modules/mailer';

// @Injectable()
// export class MailService {
//   constructor(private readonly mailerService: MailerService) {}

//   async sendPasswordResetEmail(to: string, name: string, resetLink: string) {
//     await this.mailerService.sendMail({
//       to,
//       subject: 'Password Reset Request',
//       template: './reset-password', // HBS template name
//       context: {
//         name,
//         resetLink,
//       },
//     });
//   }

//   async sendWelcomeEmail(to: string, name: string) {
//     await this.mailerService.sendMail({
//       to,
//       subject: 'Welcome to Library System',
//       template: './welcome', // Another template example
//       context: {
//         name,
//       },
//     });
//   }
// }
