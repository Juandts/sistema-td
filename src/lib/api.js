import { supabase } from './supabaseClient';

export async function fetchEventosByUser(user_id) {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('user_id', user_id);

  if (error) throw error;
  return data;
};

export async function fetchEventosNoLiquidadosByUser(userId) {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('user_id', userId)
    .eq('liquidado', false);

  if (error) {
    throw new Error("Error al obtener los eventos: " + error.message);
  }

  return data;
}

export async function fetchEventoById(eventoId) {
  try {
    const { data, error } = await supabase
      .from('eventos')
      .select('*')
      .eq('id', eventoId)
      .single();

    if (error) {
      throw new Error(`Error al obtener evento con ID ${eventoId}: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error en fetchEventoById:', error.message);
    throw error;
  }
}


export async function updateEventoLiquidado(eventoId, /*fechaFinalizacion*/) {
  try {
    const { data, error } = await supabase
      .from('eventos')
      .update({
        liquidado: true,
        //fecha_finalizacion: fechaFinalizacion,
      })
      .eq('id', eventoId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error al actualizar el evento:", error.message);
    return null;
  }
}

export async function insertEvento(evento, user_id) {
  const { data, error } = await supabase
    .from('eventos')
    .insert([{ ...evento, user_id }]);

  if (error) throw error;
  return data;
};