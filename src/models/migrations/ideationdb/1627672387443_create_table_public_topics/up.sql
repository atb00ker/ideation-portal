CREATE TABLE "public"."topics" ("title" Text NOT NULL, "description" Text, "short_description" Text, "status" INTEGER NOT NULL DEFAULT '0', "category" INTEGER NOT NULL default '0', "author" Text NOT NULL, "link" Text, "created_at" timestamptz NOT NULL DEFAULT now(), "department" INTEGER NOT NULL default '0',"updated_at" timestamptz NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id"), FOREIGN KEY ("author") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);COMMENT ON TABLE "public"."topics" IS E'Contain information about ideas and challenges';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_topics_updated_at"
BEFORE UPDATE ON "public"."topics"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_topics_updated_at" ON "public"."topics"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
