/*
  # Create announcements table and enhance participation tracking

  1. New Tables
    - `announcements`
      - `id` (uuid, primary key)
      - `title` (text) - Título do anúncio
      - `description` (text) - Descrição do anúncio
      - `image_url` (text, nullable) - URL da imagem
      - `link_url` (text, nullable) - URL de destino
      - `is_active` (boolean) - Se o anúncio está ativo
      - `start_date` (timestamptz) - Data de início
      - `end_date` (timestamptz, nullable) - Data de fim
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Changes to existing tables
    - Add `status` column to `hackathon_participants`
      - Values: 'inscrito', 'participando', 'finalizado'
    - Add `prize_won` column to `hackathon_participants`
      - Valor do prêmio ganho (se aplicável)
    - Add `placement` column to `hackathon_participants`
      - Colocação do participante (1º, 2º, 3º, etc)

  3. Security
    - Enable RLS on `announcements` table
    - Add policies for authenticated users to read active announcements
    - Add policies for participants to view their participations
*/

-- Add columns to hackathon_participants if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'hackathon_participants' AND column_name = 'status'
  ) THEN
    ALTER TABLE hackathon_participants ADD COLUMN status text DEFAULT 'inscrito' CHECK (status IN ('inscrito', 'participando', 'finalizado'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'hackathon_participants' AND column_name = 'prize_won'
  ) THEN
    ALTER TABLE hackathon_participants ADD COLUMN prize_won numeric DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'hackathon_participants' AND column_name = 'placement'
  ) THEN
    ALTER TABLE hackathon_participants ADD COLUMN placement integer;
  END IF;
END $$;

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  link_url text,
  is_active boolean DEFAULT true,
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for announcements
CREATE POLICY "Authenticated users can view active announcements"
  ON announcements
  FOR SELECT
  TO authenticated
  USING (
    is_active = true 
    AND start_date <= now() 
    AND (end_date IS NULL OR end_date >= now())
  );

-- RLS Policies for hackathon_participants (if not exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'hackathon_participants' 
    AND policyname = 'Users can view their own participations'
  ) THEN
    CREATE POLICY "Users can view their own participations"
      ON hackathon_participants
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'hackathon_participants' 
    AND policyname = 'Users can insert their own participations'
  ) THEN
    CREATE POLICY "Users can insert their own participations"
      ON hackathon_participants
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'hackathon_participants' 
    AND policyname = 'Users can update their own participations'
  ) THEN
    CREATE POLICY "Users can update their own participations"
      ON hackathon_participants
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Insert sample announcement
INSERT INTO announcements (title, description, image_url, is_active, start_date)
VALUES (
  'Bem-vindo ao OmniHack!',
  'Participe dos melhores hackathons e mostre seu talento para grandes empresas.',
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  true,
  now()
) ON CONFLICT DO NOTHING;