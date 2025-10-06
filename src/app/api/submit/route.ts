import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    body['chkiagree'] = true;
    const formData = {
      item: {
        token: body.id,
        app: body
      }
    };

    const response = await fetch(`${process.env.API_BASE_URL}/ca/hard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log('response', data);
    if (data.error == 0) {
      return NextResponse.json({ success: true, message: 'Application submitted successfully', id: data.id }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: data.msg || 'Application submission failed', id: data.id }, { status: 400 });
    }
  } catch (error) {
    console.error('Form submission error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Invalid form data',
        errors: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 400 }
    )
  }
}
