/*
  # Add Supabase Cron Jobs

  1. Extension
    - Enable `pg_cron` for scheduled tasks
  
  2. Scheduled Jobs
    - `sync-discount-status`: Updates `discount_active` based on current time every minute
    - `vacuum-analyze`: Performs database maintenance daily at 3:00 AM
*/

-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a function to update discount status
CREATE OR REPLACE FUNCTION update_discount_statuses()
RETURNS void AS $$
BEGIN
  UPDATE menu_items
  SET discount_active = CASE
    WHEN (discount_start_date IS NULL OR now() >= discount_start_date) AND
         (discount_end_date IS NULL OR now() <= discount_end_date) THEN true
    ELSE false
  END
  WHERE discount_start_date IS NOT NULL OR discount_end_date IS NOT NULL;
END;
$$ LANGUAGE plpgsql;

-- Schedule the discount status sync job (every minute)
SELECT cron.schedule(
  'sync-discount-status',
  '* * * * *',
  'SELECT update_discount_statuses();'
);

-- Schedule database maintenance (daily at 3 AM)
SELECT cron.schedule(
  'vacuum-analyze',
  '0 3 * * *',
  'VACUUM ANALYZE'
);
