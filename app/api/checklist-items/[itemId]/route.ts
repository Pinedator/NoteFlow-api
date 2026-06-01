import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { z } from 'zod';

const patchSchema = z.object({
  is_completed: z.boolean().optional(),
  text: z.string().min(1).optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    const { itemId } = await params;
    const body = await request.json();
    const result = patchSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ errors: result.error.issues }, { status: 400 });
    }
    const { is_completed, text } = result.data;
    const [item] = await query(
      'UPDATE checklist_items SET is_completed = COALESCE($1, is_completed), text = COALESCE($2, text) WHERE id = $3 RETURNING *',
      [is_completed, text, itemId]
    );
    if (!item) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    const { itemId } = await params;
    await query('DELETE FROM checklist_items WHERE id = $1', [itemId]);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}