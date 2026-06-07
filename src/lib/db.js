import { createClient } from './supabase/client';
import { z } from 'zod';

// We use the browser client because our current pages are "use client" components
const supabase = createClient();

const OrderSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  brief: z.string().min(1, "Brief is required").max(5000),
  type: z.string().optional(),
  priority: z.string().optional(),
  deadline: z.string().optional()
});

export const getOrders = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  return data;
};

export const getOrderById = async (id) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .eq('client_id', user.id)
    .single();
    
  if (error) {
    console.error('Error fetching order by id:', error);
    return null;
  }
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .eq('client_id', user.id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating order status:', error);
    return null;
  }
  return data;
};

export const requestRevision = async (id, notes) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // First update the order status
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .update({ status: 'revision' })
    .eq('id', id)
    .eq('client_id', user.id)
    .select()
    .single();
    
  if (orderError) {
    console.error('Error updating order status for revision:', orderError);
    return null;
  }

  // Then insert the revision note
  const revisionId = `REV-${Math.floor(100 + Math.random() * 900)}`;
  const { error: revError } = await supabase
    .from('revisions')
    .insert([
      { id: revisionId, order_id: id, notes: notes }
    ]);

  if (revError) {
    console.error('Error inserting revision note:', revError);
  }

  return order;
};

export const approveOrder = async (id, rating, feedback) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('orders')
    .update({ 
      status: 'completed',
      rating: rating,
      feedback: feedback
    })
    .eq('id', id)
    .eq('client_id', user.id)
    .select()
    .single();
    
  if (error) {
    console.error('Error approving order:', error);
    return null;
  }
  return data;
};

export const createNewOrder = async (orderData) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('Error: User not authenticated');
    return null;
  }

  let parsedData;
  try {
    parsedData = OrderSchema.parse(orderData);
  } catch (error) {
    console.error('Validation Error:', error);
    return null;
  }

  // Generate a random ID for the mockup
  const id = `ORD-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
  
  const newOrder = {
    id,
    client_id: user.id,
    title: parsedData.title,
    brief: parsedData.brief,
    type: parsedData.type || 'design',
    status: 'submitted',
    priority: parsedData.priority || 'normal',
    word_count: 0,
    price: 0.00,
    deadline: parsedData.deadline || new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
    created_at: new Date().toISOString().split('T')[0]
  };

  const { data, error } = await supabase
    .from('orders')
    .insert([newOrder])
    .select()
    .single();

  if (error) {
    console.error('Error creating new order:', error);
    return null;
  }
  return data;
};

export const updateOrder = async (id, orderData) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  let parsedData;
  try {
    parsedData = OrderSchema.parse(orderData);
  } catch (error) {
    console.error('Validation Error:', error);
    return null;
  }

  const { data, error } = await supabase
    .from('orders')
    .update({
      title: parsedData.title,
      brief: parsedData.brief,
      type: parsedData.type,
      priority: parsedData.priority,
      deadline: parsedData.deadline
    })
    .eq('id', id)
    .eq('client_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating order:', error);
    return null;
  }
  return data;
};

export const deleteOrder = async (id) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id)
    .eq('client_id', user.id);

  if (error) {
    console.error('Error deleting order:', error);
    return false;
  }
  return true;
};
