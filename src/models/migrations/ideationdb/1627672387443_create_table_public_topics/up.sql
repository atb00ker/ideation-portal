CREATE TABLE "public"."topics" ("title" Text NOT NULL, "description" Text, "short_description" Text, "status" INT
 NOT NULL DEFAULT '0', "author" Text NOT NULL, "link" text, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") , FOREIGN KEY ("author") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);COMMENT ON TABLE "public"."topics" IS E'Contain information about ideas and challenges';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
