import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
// Outputs: /builtwith.json
export async function POST(request) {
  const isbody = await request.json();
  // // console.log(isbody);
  const { to, from, subject, html, text } = isbody;
  // if (!to || !from || !html || !subject || !text) {
  //   return new Response(null, {
  //     status: 404,
  //     statusText: "did not provide the right data",
  //   });
  // }
  await resend.emails.send({
    from,
    to,
    subject,
    html,
    text,
  });

  // if (send.data) {
  //   return new Response(
  //     JSON.stringify({
  //       message: send.data,
  //     }),
  //     {
  //       status: 200,
  //       statusText: "OK",
  //     }
  //   );
  // }

  // if (send.error) {
  //   return new Response(
  //     JSON.stringify({
  //       message: send.error,
  //     }),
  //     {
  //       status: 500,
  //       statusText: "NOT OK, Internal server error",
  //     }
  //   );
  // }
  return NextResponse.json(
    { message: "mail send successfull" },
    { status: 200 }
  );
}

// export const GET = async ({ params, request }) => {
//   const send = await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: "lovedose4166@gmail.com",
//     subject: "Hello World",
//     html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
//     text: "hi hello i am new mailer ",
//   });

//   if (send.data) {
//     return new Response(
//       JSON.stringify({
//         message: send.data,
//       }),
//       {
//         status: 200,
//         statusText: "OK",
//       }
//     );
//   }

//   if (send.error) {
//     return new Response(
//       JSON.stringify({
//         message: send.error,
//       }),
//       {
//         status: 500,
//         statusText: "NOT OK, Internal server error",
//       }
//     );
//   }
//   return NextResponse.json(
//     { message: "mail send successfull" },
//     { status: 200 }
//   );
// };
