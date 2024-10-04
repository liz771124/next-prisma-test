import { NextResponse } from 'next/server';

export function handleApiError(error: unknown) {
  console.error('API error:', error);
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
}