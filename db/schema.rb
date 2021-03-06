# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20131223111449) do

  create_table "profiles", force: true do |t|
    t.string   "nic_number",                                     null: false
    t.string   "name",                     default: ""
    t.string   "common_name",              default: ""
    t.string   "group"
    t.string   "phone_number"
    t.text     "home_address"
    t.string   "school"
    t.string   "al_stream"
    t.string   "degree"
    t.string   "nationality",              default: "Srilankan"
    t.string   "profile_picture_location"
    t.string   "gender",                   default: "N/A",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "nic_number",             default: ""
    t.string   "role",                   default: "guest"
  end

  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
