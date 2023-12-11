import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
// export async function POST(request) {
//   const isbody = await request.json();
//   const { to, from, subject, html, text } = isbody;
//   console.log(isbody);
//   await resend.emails.send({
//     from: isbody.from,
//     to: isbody.to,
//     subject: isbody.subject,
//     html: isbody.html,
//     text: isbody.text,
//   });

//   // if (send.data) {
//   //   return new Response(
//   //     JSON.stringify({
//   //       message: send.data,
//   //     }),
//   //     {
//   //       status: 200,
//   //       statusText: "OK",
//   //     }
//   //   );
//   // }

//   // if (send.error) {
//   //   return new Response(
//   //     JSON.stringify({
//   //       message: send.error,
//   //     }),
//   //     {
//   //       status: 500,
//   //       statusText: "NOT OK, Internal server error",
//   //     }
//   //   );
//   // }
//   return NextResponse.json(
//     { message: "mail send successfull" },
//     { status: 200 }
//   );
// }

export const GET = async ({ params, request }) => {
  const send = await resend.emails.send({
    from: "jihadkhan934@gmail.com",
    to: "lovedose4166@gmail.com",
    subject: "Hello World gf",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    text: "hi hello i am new mailer ",
  });

  if (send.data) {
    return new Response(
      JSON.stringify({
        message: send.data,
      }),
      {
        status: 200,
        statusText: "OK",
      }
    );
  }

  if (send.error) {
    return new Response(
      JSON.stringify({
        message: send.error,
      }),
      {
        status: 500,
        statusText: "NOT OK, Internal server error",
      }
    );
  }
  return NextResponse.json(
    { message: "mail send successfull" },
    { status: 200 }
  );
};
