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

const StatusSchema = z.enum(['submitted', 'in_progress', 'review', 'revision', 'completed', 'delivered']);
const NotesSchema = z.string().min(1).max(2000);
const RatingSchema = z.number().min(0).max(5);
const FeedbackSchema = z.string().max(2000).optional();

export const getOrders = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching orders. Please try again later.');
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
    console.error('Error fetching order by id. Please try again later.');
    return null;
  }
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  let parsedStatus;
  try {
    parsedStatus = StatusSchema.parse(status);
  } catch (err) {
    console.error('Validation Error for status.');
    return null;
  }

  const { data, error } = await supabase
    .from('orders')
    .update({ status: parsedStatus })
    .eq('id', id)
    .eq('client_id', user.id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating order status. Please try again later.');
    return null;
  }
  return data;
};

export const requestRevision = async (id, notes) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  let parsedNotes;
  try {
    parsedNotes = NotesSchema.parse(notes);
  } catch (err) {
    console.error('Validation Error for notes.');
    return null;
  }

  // First update the order status
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .update({ status: 'revision' })
    .eq('id', id)
    .eq('client_id', user.id)
    .select()
    .single();
    
  if (orderError) {
    console.error('Error updating order status for revision. Please try again later.');
    return null;
  }

  // Then insert the revision note
  const revisionId = `REV-${Math.floor(100 + Math.random() * 900)}`;
  const { error: revError } = await supabase
    .from('revisions')
    .insert([
      { id: revisionId, order_id: id, notes: parsedNotes }
    ]);

  if (revError) {
    console.error('Error inserting revision note. Please try again later.');
  }

  return order;
};

export const approveOrder = async (id, rating, feedback) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  let parsedRating, parsedFeedback;
  try {
    parsedRating = RatingSchema.parse(rating);
    parsedFeedback = FeedbackSchema.parse(feedback || "");
  } catch (err) {
    console.error('Validation Error for rating or feedback.');
    return null;
  }

  const { data, error } = await supabase
    .from('orders')
    .update({ 
      status: 'completed',
      rating: parsedRating,
      feedback: parsedFeedback
    })
    .eq('id', id)
    .eq('client_id', user.id)
    .select()
    .single();
    
  if (error) {
    console.error('Error approving order. Please try again later.');
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
    console.error('Error creating new order. Please try again later.');
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
    console.error('Error updating order. Please try again later.');
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
    console.error('Error deleting order. Please try again later.');
    return false;
  }
  return true;
};
