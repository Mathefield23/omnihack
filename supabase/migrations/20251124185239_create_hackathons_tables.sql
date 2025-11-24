/*
  # Create hackathons and participants tables

  1. New Tables
    - `hackathons`
      - `id` (uuid, primary key)
      - `empresa_id` (uuid, foreign key to profiles)
      - `nome` (text, required)
      - `descricao` (text, required)
      - `premio` (numeric, required)
      - `data` (date, required)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `hackathon_participants`
      - `id` (uuid, primary key)
      - `hackathon_id` (uuid, foreign key to hackathons)
      - `user_id` (uuid, foreign key to profiles)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on both tables
    - Hackathons:
      - Authenticated users can read all hackathons
      - Companies can insert their own hackathons
      - Companies can update their own hackathons
      - Companies can delete their own hackathons
    - Participants:
      - Authenticated users can read all participants
      - Developers can insert themselves as participants
      - Users can delete their own participation

  3. Indexes
    - Index on empresa_id for faster company lookups
    - Index on hackathon_id for faster participant lookups
    - Index on user_id for faster user participation lookups
*/

CREATE TABLE IF NOT EXISTS hackathons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  nome text NOT NULL,
  descricao text NOT NULL,
  premio numeric NOT NULL DEFAULT 0,
  data date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hackathon_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hackathon_id uuid NOT NULL REFERENCES hackathons(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(hackathon_id, user_id)
);

-- Enable RLS
ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathon_participants ENABLE ROW LEVEL SECURITY;

-- Hackathons policies
CREATE POLICY "Anyone can read hackathons"
  ON hackathons FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Companies can insert their own hackathons"
  ON hackathons FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'empresa'
      AND profiles.id = empresa_id
    )
  );

CREATE POLICY "Companies can update their own hackathons"
  ON hackathons FOR UPDATE
  TO authenticated
  USING (empresa_id = auth.uid())
  WITH CHECK (empresa_id = auth.uid());

CREATE POLICY "Companies can delete their own hackathons"
  ON hackathons FOR DELETE
  TO authenticated
  USING (empresa_id = auth.uid());

-- Participants policies
CREATE POLICY "Anyone can read participants"
  ON hackathon_participants FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert themselves as participants"
  ON hackathon_participants FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own participation"
  ON hackathon_participants FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_hackathons_empresa_id ON hackathons(empresa_id);
CREATE INDEX IF NOT EXISTS idx_hackathons_data ON hackathons(data);
CREATE INDEX IF NOT EXISTS idx_participants_hackathon_id ON hackathon_participants(hackathon_id);
CREATE INDEX IF NOT EXISTS idx_participants_user_id ON hackathon_participants(user_id);

-- Create trigger for hackathons updated_at
CREATE TRIGGER update_hackathons_updated_at
  BEFORE UPDATE ON hackathons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
