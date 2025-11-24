/*
  # Add soft delete to hackathons table

  1. Changes
    - Add `deleted_at` column to hackathons table for soft delete functionality
    - Column is nullable timestamptz, null means not deleted
    - Update RLS policies to exclude soft-deleted hackathons from queries
    - Add index on deleted_at for performance

  2. Notes
    - Soft delete allows recovery of accidentally deleted hackathons
    - Queries will need to filter WHERE deleted_at IS NULL
    - Admins can still access deleted records if needed
*/

-- Add deleted_at column to hackathons table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'hackathons' AND column_name = 'deleted_at'
  ) THEN
    ALTER TABLE hackathons ADD COLUMN deleted_at timestamptz DEFAULT NULL;
  END IF;
END $$;

-- Create index for faster queries on non-deleted hackathons
CREATE INDEX IF NOT EXISTS idx_hackathons_deleted_at ON hackathons(deleted_at) WHERE deleted_at IS NULL;

-- Drop existing policies and recreate with soft delete filter
DROP POLICY IF EXISTS "Anyone can read hackathons" ON hackathons;
DROP POLICY IF EXISTS "Companies can update their own hackathons" ON hackathons;
DROP POLICY IF EXISTS "Companies can delete their own hackathons" ON hackathons;

-- Recreate policies with soft delete filter
CREATE POLICY "Anyone can read non-deleted hackathons"
  ON hackathons FOR SELECT
  TO authenticated
  USING (deleted_at IS NULL);

CREATE POLICY "Companies can update their own non-deleted hackathons"
  ON hackathons FOR UPDATE
  TO authenticated
  USING (empresa_id = auth.uid() AND deleted_at IS NULL)
  WITH CHECK (empresa_id = auth.uid());

CREATE POLICY "Companies can soft delete their own hackathons"
  ON hackathons FOR UPDATE
  TO authenticated
  USING (empresa_id = auth.uid())
  WITH CHECK (empresa_id = auth.uid());
