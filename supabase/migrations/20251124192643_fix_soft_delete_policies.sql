/*
  # Fix soft delete RLS policies

  1. Changes
    - Drop conflicting UPDATE policies
    - Create single UPDATE policy that allows:
      - Updating non-deleted hackathons (regular updates)
      - Setting deleted_at on non-deleted hackathons (soft delete)
    - Ensures companies can only update their own hackathons

  2. Security
    - Maintains ownership check (empresa_id = auth.uid())
    - Allows soft delete by permitting deleted_at to be set
    - Prevents updates to already deleted hackathons unless restoring
*/

-- Drop existing UPDATE policies
DROP POLICY IF EXISTS "Companies can update their own non-deleted hackathons" ON hackathons;
DROP POLICY IF EXISTS "Companies can soft delete their own hackathons" ON hackathons;

-- Create a single comprehensive UPDATE policy
CREATE POLICY "Companies can update and soft delete their own hackathons"
  ON hackathons FOR UPDATE
  TO authenticated
  USING (empresa_id = auth.uid())
  WITH CHECK (empresa_id = auth.uid());
